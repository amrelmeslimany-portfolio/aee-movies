import React from "react";
import { Link } from "react-router-dom";
import AddFAVButton from "../UI/AddFAVButton";
import DeleteButton from "../UI/DeleteButton";

import "./MovieActions.less";

function MovieActions({ itemID, link, className, removeble }) {
  return (
    <div className={`footer__actions ${className ? className : ""}`}>
      <Link to={link} className="watchnow-link">
        شاهد الأن
      </Link>

      {removeble ? (
        <DeleteButton itemID={itemID} />
      ) : (
        <AddFAVButton itemID={itemID} />
      )}
    </div>
  );
}

export default React.memo(MovieActions);
