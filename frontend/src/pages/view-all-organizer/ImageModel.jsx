import React, { useState, useContext, useEffect } from "react";
import { ImCross } from "react-icons/im";

export default function ImageModal({ visible, onClose, image }) {
	
	const onCloseModel = () => {

		onClose();
	};

    if (visible == "false") return null;

	return (
		<>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="ml-[700px] mt-[12px] mr-auto">
						<button onClick={onCloseModel}>
							<ImCross className="fill-red-600 hover:fill-red-400" />
						</button>
					</div>

			<div>
            <img src={image}></img>
			</div>
        </div>

		</>
	);
}
