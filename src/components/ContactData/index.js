import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import Button from "../General/Button";
import Spinner from "../General/Spinner";
import { withRouter } from "react-router-dom";
import * as actions from "../../redux/actions/orderActions"

const ContactData = (props) => {
  const [zuerName, SetZuerName] = useState("");
  const [CityName, SetCityName] = useState("");
  const [StreetName, SetStreetName] = useState("");

  useEffect(() => {
    if (
      props.newOrderStatus.finished && !props.newOrderStatus.error) {
      props.history.replace("/orders");
    }
    return () => {
      // Цэвэрэлэгч функц : reducer дээрх хадгалагдсан state - ийг цэвэрлэнэ
      props.ClearingSavedOrderAction();
    }
  }, [props.newOrderStatus.finished]);

  const changeName = e => {
    SetZuerName(e.target.value);
  };

  const changeStreet = e => {
    SetStreetName(e.target.value);
  };

  const changeCity = e => {
    SetCityName(e.target.value);
  };
  const saveOrder = () => {
    const newOrder = {
      userId: props.userId,
      orts: props.ingredients,
      dun: props.price,
      hayag: {
        name: zuerName,
        city: CityName,
        street: StreetName
      }
    };

    props.saveOrderAction(newOrder)
  };

  return (
    <div className={css.ContactData}>
      Une: {props.price}$
      <div>{props.newOrderStatus.error && "Chinii zahialgiig awahgu :  "}
      </div>
      {props.newOrderStatus.save ? (
        <Spinner />
      ) : (
        <div>
          <input
            onChange={changeName}
            type="text"
            name="name"
            placeholder="Таны нэр"
          />
          <input
            onChange={changeStreet}
            type="text"
            name="street"
            placeholder="Таны гэрийн хаяг"
          />
          <input
            onChange={changeCity}
            type="text"
            name="city"
            placeholder="Таны хот"
          />
          <Button
            text="ИЛГЭЭХ"
            btnType="Success"
            daragdsan={saveOrder}
          >

          </Button>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    price: state.burgerReducer.totalPrice,
    ingredients: state.burgerReducer.ingredients,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.SignUpreducer.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveOrderAction: (newOrder) => dispatch(actions.saveOrder(newOrder)),
    ClearingSavedOrderAction: () => dispatch(actions.saveOrderSuccess()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));
