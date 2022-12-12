export default function ProductItem(props) {   
  return (
    <div className="item">
      <h4>{props.info["name"]}</h4>
      <div class="frame">
        <img src={props.info["image_link"]}></img>
      </div>
      <ul>
        <li>Project Type: {props.info["product_type"]}</li>
        <li>Introduction: {props.info["processor"]}</li>
        <li>Description: {props.info["slogan"]}</li>
      </ul>
      <button onClick={() => props.setStateOfParent(props.info["name"], props.info["price"])}>
      <a href={props.info["price"]}>Go to Project Site</a></button>
    </div>);
}
