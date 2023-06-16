import toast from "cogo-toast";
import copy from "copy-to-clipboard";
import React from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import FileSaver from "file-saver";

function Icon({ icon, name, highlightPattern = null }) {
  const copyToClipboard = () => {
    copy(name);
    toast.success(`Copied '${name}' to clipboard`, {
      position: "bottom-center",
    });
  };

  const highlightedName = () => {
    if (highlightPattern)
      return name
        .split(highlightPattern)
        .map((part) => (part.match(highlightPattern) ? <b>{part}</b> : part));
    return name;
  };

  return (
    <div className="item" tabIndex={0} onClick={copyToClipboard} key={name}>
      <div className="icon h2">{typeof icon === "function" && icon()}</div>
      <div className="name">{highlightedName()}</div>
      <div
        className="download"
        onClick={(event) => {
          event.stopPropagation();
          const targetSvg = event.currentTarget
            .closest(".item")
            .querySelector("svg");
          const blob = new Blob([targetSvg.outerHTML], {
            type: "text/plain;charset=utf-8",
          });
          FileSaver.saveAs(blob, `${name}.svg`);
        }}
      >
        <AiOutlineCloudDownload />
      </div>
    </div>
  );
}

export default Icon;
