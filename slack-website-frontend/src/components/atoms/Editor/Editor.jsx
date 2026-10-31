import { Button } from "@base-ui/react";
import { Icon, ImageIcon, LucideChartCandlestick, LucideToggleLeft, ToggleLeft, ToggleRight, ToggleRightIcon } from "lucide-react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { Hint } from "@/components/atoms/Hint/Hint";





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

      function toggleToolbar() {
        setIsToolbarvisible(!isToolbarVisible);
        const toolbar = containerRef.current.querySelector('.ql-toolbar');
        if(toolbar) {
            toolbar.classList.toggle('hidden');
        }
    }

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
                            handler: () => {
                                const range = quill.getSelection();

                                if (range) {
                                    quill.insertText(range.index, "\n");
                                }

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
            <div className="flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white transition">
                <div className="h-full ql-custom" ref={containerRef} />
                 <div className='flex px-2 pb-2 z-[5]'>
                     <Hint label={!isToolbarVisible ? 'Show toolbar' : 'Hide toolbar'} side='bottom' align='center'>
                        <Button
                            size="iconSm"
                            variant="ghost"
                            disabled={false}
                            onClick={toggleToolbar}
                        >
                            {isToolbarVisible ? <ToggleLeft className='iconMd' /> : <ToggleRight className='iconMd' />}
                        </Button>
                    </Hint>

                    <Hint label="Image">
                        <Button
                            size="iconMd"
                            variant="ghost"
                            disabled={false}
                            onClick={() => {}}
                        >
                            <ImageIcon className='size-4' />
                        </Button>
                    </Hint>
                </div>
            </div>

            <p className="text-xs text-slate-400 mt-1 text-end">
                <strong>Shift + Enter</strong> to add a new line
            </p>
        </div>
    );
};
