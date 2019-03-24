import React, { Component } from "react";

import PgInfo from "./PgInfo";
import PgAvatar from './PgAvatar';
import PgReviews from "./PgReviews";
import Calendar from "../common/Calendar";


import "../../stylesheets/PgCard.css";


class PgCard extends Component {
  state = {
    isCollapsed: true
  };
  componentDidMount() {
    const { isFirst } = this.props;
    this.setState({ isCollapsed: !isFirst });

  }
  handleClick = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  }
  render() {
    const { photographer } = this.props;
    const { isCollapsed } = this.state;
    return <div className="pgCard">
      <div className="preview" >
        <div className="preview-data" >
          <PgAvatar photographer={photographer} />
          <PgInfo photographer={photographer} />
          <Calendar photographer={photographer} />
        </div>
        <button type="button" onClick={this.handleClick} className="btn btn-link more">more...</button>
      </div>
      <div className={`collapsed-data ${isCollapsed ? "is-collapsed" : ""}`}>
        <div className="insta">
          <div className="pretend-pix">
            {photographer.portfolio.map(({ id, picURL, alt }) => (<div key={`pic-${id}`} className="pretend-pic"><img src={picURL} alt={alt}></img></div>))}
          </div>
          <button type="button" className="btn btn-link more">more...</button>
        </div>
        <PgReviews photographer={photographer} />
      </div>
    </div >;
  }
}

export default PgCard;
