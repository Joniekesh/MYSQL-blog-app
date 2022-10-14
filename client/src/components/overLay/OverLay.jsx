import "./overLay.scss";

const Overlay = ({ openOverLay, setOpenOverLay }) => {
	const handleClose = () => {
		setOpenOverLay(false);
	};

	return (
		openOverLay && (
			<div className="overLay" onClick={handleClose}>
				Overlay
			</div>
		)
	);
};

export default Overlay;
