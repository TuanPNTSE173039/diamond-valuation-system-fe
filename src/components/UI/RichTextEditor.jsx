import React, { useImperativeHandle, useRef, useEffect } from "react";
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

const UIRichTextEditor = React.forwardRef(({ value, isDisabled, onChange }, ref) => {
    const rteRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getContent: () => rteRef.current?.editor?.getHTML(),
        setContent: (content) => rteRef.current?.editor?.setContent(content, true), // `true` to parse the content as HTML
    }));

    useEffect(() => {
        if (rteRef.current && rteRef.current.editor) {
            const handleUpdate = () => {
                const content = rteRef.current.editor.getHTML();
                onChange(content);
            };

            const editorInstance = rteRef.current.editor;
            editorInstance.on('update', handleUpdate);

            return () => {
                editorInstance.off('update', handleUpdate);
            };
        }
    }, [onChange]);

    return (
        <Box>
            <RichTextEditor
                ref={rteRef}
                editable={!isDisabled}
                extensions={[StarterKit]}
                content={value}
                style={{ border: "1px solid #ccc", backgroundColor: "white" }}
                renderControls={() => (
                    <MenuControlsContainer>
                        <MenuSelectHeading />
                        <MenuDivider />
                        <MenuButtonBold />
                        <MenuButtonItalic />
                        <MenuButtonIndent />
                        <MenuButtonBulletedList />
                    </MenuControlsContainer>
                )}
            />
        </Box>
    );
});

export default UIRichTextEditor;
