import './index.css';

interface Props {
  title: string;
  imgPath: string;
}
const Header = ({ title, imgPath }: Props) => {
  return (
    <div className="banner">
      <img src={imgPath} className="banner-img" />
      <h2 className="banner-title">{title}</h2>
    </div>
  );
};

export default Header;
