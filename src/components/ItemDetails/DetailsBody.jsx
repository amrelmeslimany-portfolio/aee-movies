import InfoTag from "./InfoTag";
import { Divider, Image, Table, Tag, Typography } from "antd";
import errorImage from "../../assets/imgs/movie-error.png";
import DownloadButton from "./DownloadButton";
import "./DetailsBody.less";
import { useState } from "react";

const columns = (isImageErorr, onImageError) => [
  {
    title: "الصورة",
    key: "image",
    width: 200,
    dataIndex: "image",
    render: (src) => (
      <Image
        src={isImageErorr ? errorImage : src}
        preview={false}
        width={60}
        height={80}
        onError={onImageError}
      />
    ),
  },

  {
    title: "الدقة",
    key: "accuraccy",
    dataIndex: "accuraccy",
    width: 250,
  },
  {
    title: "الحجم",
    key: "size",
    width: 180,
    dataIndex: "size",
    render: (size = "") => {
      let best =
        parseInt(size) > 200 && parseInt(size) < 500 ? "best-choice" : "";
      let sobig =
        parseInt(size) > 500 || size.includes("GB") ? "sobig-choice" : "";
      return <Tag className={`size-movie-tag ${best} ${sobig}`}>{size}</Tag>;
    },
  },
  {
    title: "المشاهده والتحميل",
    key: "links",
    dataIndex: "links",
    fixed: "right",
    width: 250,

    render: (link) => <DownloadButton link={link} />,
  },
];

function DetailsBody({ data }) {
  const {
    movieCountry,
    movieLanguage,
    movieDuration,
    movieQuality,
    movieCategory,
    movieType,
    movieStory,
    movieRating,
    movieVideo,
    movieThumbnail,
  } = data;

  const [isImageErorr, setIsImageErorr] = useState(false);
  const onCheckErorrImage = (event) => setIsImageErorr(true);

  const datasource = movieVideo?.map((item, index) => ({
    key: index,
    image: movieThumbnail,
    accuraccy: item.accuraccy,
    size: item.videoSize,
    links: item.watchLink,
  }));
  return (
    <div className="itemaboutinfo-wrap">
      <Tag className="category-suitable" color="#e74c3c7a">
        {movieCategory}
      </Tag>

      <ul className="tags-list">
        <InfoTag label={"التقييم"} title={movieRating} />
        <InfoTag label={"الجودة"} title={movieQuality?.join(" - ")} />
        <InfoTag label={"المده"} title={movieDuration} />
        <li className="tag-divider">
          <Divider type="vertical" />
        </li>
        <InfoTag label={"التصنيف"} title={movieType} />
        <li className="tag-divider">
          <Divider type="vertical" />
        </li>
        <InfoTag label={"الدولة"} title={movieCountry} />
        <InfoTag label={"اللغة"} title={movieLanguage} />
      </ul>

      <Divider>الوصف</Divider>

      <article className="article">
        <Typography.Text className="article-title ff-almaria" strong>
          {movieStory && movieStory[0]}
        </Typography.Text>
        <Typography.Paragraph className="article-paragraph">
          {movieStory && movieStory[1]}
        </Typography.Paragraph>
      </article>

      <Table
        dataSource={datasource}
        columns={columns(isImageErorr, onCheckErorrImage)}
        pagination={false}
        bordered={false}
        size="small"
        id="downloadwatch"
        scroll={{ x: true }}
      />
    </div>
  );
}

export default DetailsBody;
