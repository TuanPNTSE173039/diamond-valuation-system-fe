import Box from "@mui/material/Box";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonIndent,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
} from "mui-tiptap";
import { forwardRef, useImperativeHandle, useRef } from "react";

const UIRichTextEditor = forwardRef(({ value, isDisabled }, ref) => {
  const rteRef = useRef(null);
  useImperativeHandle(ref, () => ({
    getContent: () => rteRef.current?.editor?.getHTML(),
    setContent: (content) => rteRef.current?.editor?.setContent(content),
  }));
  return (
    <Box>
      <RichTextEditor
        ref={rteRef}
        editable={!isDisabled}
        extensions={[StarterKit]} // Or any Tiptap extensions you wish!
        content={`${value}`} // Initial content for the editor
        configureEditor={(editor) => {
          // You can configure the editor here
          // See: https://www.tiptap.dev/api/editor
        }}
        style={{ border: "1px solid #ccc", backgroundColor: "red" }}
        renderControls={() => (
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuButtonIndent />
            <MenuButtonBulletedList />
            {/*<MenuButtonUnderline />*/}
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
