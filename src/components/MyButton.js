const MyButton = ({ text, type, onClick }) => {
  //{받아야할 Props}

  const btnType = ["positive", "negative"].includes(type) ? type : "default"; //없는 타입이 들어올 경우 default 취급
  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  tpye: "default",
};

export default MyButton;
