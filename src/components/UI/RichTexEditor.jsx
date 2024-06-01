import Box from "@mui/material/Box";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
} from "mui-tiptap";
import { forwardRef, useImperativeHandle, useRef } from "react";

const UIRichTextEditor = forwardRef(({ value }, ref) => {
  const rteRef = useRef(null);
  useImperativeHandle(ref, () => ({
    getContent: () => rteRef.current?.editor?.getHTML(),
  }));
  return (
    <Box sx={{ height: 500 }}>
      <RichTextEditor
        ref={rteRef}
        extensions={[StarterKit]} // Or any Tiptap extensions you wish!
        content={`${value}`} // Initial content for the editor
        //expand height of the content full of the box container
        style={{ height: "100%" }}
        // Optionally include `renderControls` for a menu-bar atop the editor:
        renderControls={() => (
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            {/* Add more controls of your choosing here */}
          </MenuControlsContainer>
        )}
      />

      {/*<Button onClick={() => console.log(rteRef.current?.editor?.getHTML())}>*/}
      {/*  Log HTML*/}
      {/*</Button>*/}
    </Box>
  );
});

export default UIRichTextEditor;
