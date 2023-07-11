import { useContext, useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { Col, Image, Row, Skeleton, Tag, Typography } from "antd";
import { Star } from "@material-ui/icons";
import AddFAVButton from "../UI/AddFAVButton";
import { FavouriteContext } from "../../context/favourite/favourite-context";
import { ADD_VISITEDBEFORE_ITEM } from "../../context/favourite/favouriteActions";
import errorImg from "../../assets/imgs/movie-error.png";
import "./DetailsHeader.less";
import useDocTitle from "../../hooks/useDocTitle";

function DetailsHeader({ data }) {
  const {
    movieTrailor,
    movieImg,
    movieTitle,
    movieRating,
    movieQuality,
    _id: movieID,
  } = data;
  const { dispatch } = useContext(FavouriteContext);
  const [isImageError, setIsImageError] = useState(false);

  useDocTitle(movieTitle);

  useEffect(() => {
    dispatch(ADD_VISITEDBEFORE_ITEM(movieID));
  }, [dispatch, movieID]);

  return (
    <div className="moviedetails-header">
      <section className="info-wrap">
        <article className="info">
          <Tag color="black" className="rating">
            <Star /> {movieRating}
          </Tag>
          <Typography.Title level={2} className="ff-almaria fw-8 moviename">
            {movieTitle}
          </Typography.Title>
          <Tag className="quality">{movieQuality?.join(" • ")}</Tag>
        </article>
        <div className="actions">
          <HashLink
            smooth
            to={`/details/${movieID}#downloadwatch`}
            className="hashlink-download"
          >
            للتحميل
          </HashLink>
          <AddFAVButton itemID={movieID} />
        </div>
      </section>
      <div className="mediasinfo-wrap">
        <Row gutter={20}>
          <Col span={8}>
            <Image
              className="movie-img"
              preview={false}
              src={isImageError ? errorImg : movieImg}
              width="100%"
              height={500}
              onError={() => setIsImageError(true)}
            />
          </Col>
          <Col span={16}>
            {movieTrailor ? (
              <iframe
                className="movietrailor"
                src={`${movieTrailor}?autoplay=0&showinfo=0&controls=1`}
                width="100%"
                height={500}
                title={movieTitle}
              />
            ) : (
              <Skeleton.Image className="novideo" />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default DetailsHeader;
