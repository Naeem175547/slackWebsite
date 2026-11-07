import { Button } from "@/components/ui/button";
import { Icon, ImageIcon, LucideChartCandlestick, LucideToggleLeft, MessageSquareDashedIcon, MousePointerSquareDashedIcon, ToggleLeft, ToggleRight, ToggleRightIcon, XIcon } from "lucide-react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
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

    const [image, setImage] = useState(null);
    const imageInputRef = useRef(null);
    // Quill's Enter handler is created once, so it reads the image through a ref
    const imageRef = useRef(null);

    useEffect(() => {
        submitRef.current = onSubmit;
        imageRef.current = image;
    });

    // Create the preview URL once per file and free it when the file changes
    const imagePreviewUrl = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);
    useEffect(() => {
        return () => {
            if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
        };
    }, [imagePreviewUrl]);

    function clearImage() {
        setImage(null);
        if (imageInputRef.current) imageInputRef.current.value = '';
    }

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
                            shiftKey: false,
                            handler: () => {
                                submitRef.current?.({
                                    body: JSON.stringify(quill.getContents()),
                                    image: imageRef.current,
                                });
                                quill.setText('');
                                clearImage();
                                return false;
                            }
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
                {image && (
                    <div className="p-2">
                        <div className="relative size-[60px] flex items-center justify-center group/image">
                            <button
                                className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center"
                                onClick={clearImage}
                            >
                                <XIcon className="size-4" />
                            </button>
                            <img
                                src={imagePreviewUrl}
                                alt="Selected attachment"
                                className="rounded-xl overflow-hidden border object-cover size-full"
                            />
                        </div>
                    </div>
                )}
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
                            onClick={() => imageInputRef.current?.click()}
                        >
                            <ImageIcon className='size-4' />
                        </Button>

                    </Hint>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={imageInputRef}
                        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                    />

                    
                    <div className="ml-auto">
                        <Hint label="Send Message">
                            <Button
                                size="iconSm"
                                className="bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"
                                onClick={() => {
                                const messageContent = JSON.stringify(quillRef.current?.getContents());
                                onSubmit({ body: messageContent, image });
                                quillRef.current?.setText('');
                                clearImage();
                                }}
                                disabled={false}
                            >
                                <MdSend className='size-4' />
                            </Button>
                        </Hint>
                    </div>
                </div>
            </div>

            <p className="text-xs text-slate-400 mt-1 text-end">
                <strong>Shift + Enter</strong> to add a new line
            </p>
        </div>
    );
};
