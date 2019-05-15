export const listItemHeight = 120;

export const styles: { [name: string]: React.CSSProperties } = {
  ul: {
    listStyleType: "none",
    paddingLeft: 0
  },
  li: {
    height: listItemHeight,
    position: "relative",
    marginBottom: "10px",
    cursor: "pointer",
    userSelect: "none"
  },
  boardBox: {
    float: "left",
    height: listItemHeight,
    position: "relative",
    marginRight: "10px"
  },
  infoBox: {
    margin: "10px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  title: {
    fontFamily: "verdana",
    fontWeight: "normal",
    fontSize: "30px",
    marginTop: 0,
    marginBottom: "10px"
  }
};
