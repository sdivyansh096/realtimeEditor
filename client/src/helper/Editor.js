import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current.on("change", (instance, changes) => {
        // console.log(changes);
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);

        if (origin !== "setValue") {
          socketRef.current.emit("code-change", {
            roomId,
            code,
          });
        }
      });
      // editorRef.current.setValue();
    }

    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current("code-change", ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off("code-change");
    };
  }, [socketRef.current]);

  return <textarea id="realtimeEditor"></textarea>;
}

export default Editor;
