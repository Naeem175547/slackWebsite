
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";

export const Editor = ({
    variant = "create",
    onSubmit,
    onCancel,
    placeholder,
    disabled,
    defaultValue
}) => {
    const [text, setText] = useState("");
    const [isToolbarVisible, setIsToolbarvisible] = useState(false);

    const containerRef = useRef(null);
    const quillRef = useRef(null);
    const defaultRef = useRef(null);
    const submitRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const placeholderRef = useRef(placeholder);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div")
        );

        const options = {
            theme: "snow",
            placeholder: placeholderRef.current,
            readOnly: disabled,
            modules: {
                toolbar: [
                    ["bold", "italic", "underline", "strike"],
                    ["link", "image"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"]
                ],
                keyboard: {
                    bindings: {
                        enter: {
                            key: "Enter",
                            handler: () => false
                        },
                        shift_enter: {
                            key: "Enter",
                            shiftKey: true,
                            handler: (range) => {
                                quill.insertText(
                                    range.index,
                                    "\n",
                                    "user"
                                );
                                return false;
                            }
                        }
                    }
                }
            }
        };

        const quill = new Quill(editorContainer, options);
        quillRef.current = quill;
        quill.setContents(defaultValueRef.current || []);
        quill.focus();
        return () => {
            quillRef.current = null;
            container.innerHTML = "";
        };
    }, []);

    return (
        <div className="flex flex-col justify-end w-full h-full">
            <div className="flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white transition ">
                <div ref={containerRef} />
            </div>
        </div>
    );
};
