import PropTypes from "prop-types"

const InputErrorMessage = ({ children }) => {
  return <div className="mt-1 text-sm text-red-500">{children}</div>
}

InputErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default InputErrorMessage
