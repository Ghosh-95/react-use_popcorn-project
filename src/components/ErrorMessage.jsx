export default function ErrorMessage({ message }) {
    return <p style={{ fontSize: "2rem", position: "absolute", left: "35%", top: "40%" }}>{message} ⚠️</p>
};