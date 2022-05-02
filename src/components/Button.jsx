const Button = props => {
  return (
    <button
      className={`btn ${props.className ? props.className : ''}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  )
}

export const ButtonGrey = props => {
  return (
    <Button
      className={`btn-grey ${props.className ? props.className : ''}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </Button>
  )
}

export default Button
