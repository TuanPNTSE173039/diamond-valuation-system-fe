import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../services/config/axiosInstance.js";
import { useNotification } from "../../services/notification.js";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";

const NotificationMenu = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [noti, setNoti] = useState([]);
  const [unreadNoti, setUnreadNoti] = useState([]);
  const [showUnread, setShowUnread] = useState(false);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const {
    data: notifications,
    isLoading: isNotificationLoading,
    error: notiError,
  } = useNotification(currentUser?.account.id);
  const queryClient = useQueryClient();
  const { mutate: updateRead, mutateAsync: updateReadAsync } = useMutation({
    mutationFn: async (id) => {
      await axiosInstance.put(`notifications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("notification", {
        accountId: currentUser?.account.id,
      });
    },
  });

  useEffect(() => {
    const detailPattern = /\$(\d+)/;
    const requestPattern = /#(\d+)/;
    const valuationPattern = /@(\d+)/;

    if (notifications) {
      setUnreadNoti(
        notifications.filter((notification) => !notification.isRead),
      );
      setNoti(
        notifications.map((notification) => {
          const message = notification.message;
          const detailMatch = message.match(detailPattern);
          const requestMatch = message.match(requestPattern);
          const valuationMatch = message.match(valuationPattern);

          const detail = detailMatch ? detailMatch[1] : undefined;
          const request = requestMatch ? requestMatch[1] : undefined;
          const valuation = valuationMatch ? valuationMatch[1] : undefined;

          return {
            ...notification,
            request: request && `/requests/${request}`,
            detail: request && detail && `/requests/${request}/${detail}`,
            valuation: valuation && `/valuations/${valuation}`,
          };
        }),
      );
    }
  }, [notifications]);

  if (isNotificationLoading) {
    return <UICircularIndeterminate />;
  }

  const handleNavigate = (notification) => {
    if (!notification.isRead) {
      updateRead(notification.id);
    }
    if (notification.detail) {
      navigate(notification.detail, { replace: true });
    } else if (notification.valuation) {
      navigate(notification.valuation, { replace: true });
    } else {
      navigate(notification.request, { replace: true });
    }

    setAnchorEl(null);
  };
  return (
    <Box sx={{ mr: 2 }}>
      <Badge badgeContent={unreadNoti.length} color="secondary">
        <NotificationsIcon
          sx={{
            color: "#fff",
            cursor: "pointer",
            "&:hover": { color: "#ddd" },
          }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />
      </Badge>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleNavigate}
        sx={{ width: 500 }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            minWidth: 450,
            p: 1,
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 8,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h5" fontWeight={700} pl={2}>
            Notifications
          </Typography>
          <Box flex={1}></Box>
          <Typography>Only show unread</Typography>
          <Switch
            value={showUnread}
            onChange={() => {
              setShowUnread(!showUnread);
            }}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography fontSize={14} fontWeight={700} color={grey[500]} pl={2}>
            LATEST
          </Typography>
          <Link sx={{ cursor: "pointer" }} onClick={() => {}}>
            Mark all as read
          </Link>
        </Stack>
        {noti?.map((notification) => (
          <MenuItem
            onClick={() => handleNavigate(notification)}
            key={notification?.id}
          >
            <Stack direction="row" alignItems="center">
              <Avatar sx={{ width: 100, height: 100, mr: 3 }} src={"1"} />
              <Typography
                sx={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  width: "87%",
                  fontWeight: 700,
                  px: 1,
                }}
              >
                {notification?.message}
                <Typography
                  align="right"
                  variant="span"
                  fontWeight={500}
                  fontStyle={"italic"}
                  color={grey[600]}
                >
                  {" - "}
                  {formatDistanceToNow(new Date(notification?.creationDate), {
                    addSuffix: true,
                  })}
                </Typography>
              </Typography>
              {!notification?.isRead && (
                <Box
                  width={10}
                  height={10}
                  borderRadius={"50%"}
                  bgcolor={"red"}
                />
              )}
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default NotificationMenu;
