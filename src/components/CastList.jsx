import apiConfig from "../api/apiConfig"

const CastList = ({ casts }) => {
  return (
    <div className="casts">
      {casts.map((item, index) => (
        <div className="casts__item" key={index}>
          <div className="casts__item__img">
            <img src={apiConfig.w500Image(item.profile_path)} alt="" />
          </div>
          <div className="casts__item__name">
            {item.name}
          </div>
          <div className="casts__item__character">
            {item.character}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CastList