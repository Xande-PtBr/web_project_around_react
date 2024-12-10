export default function NewCard() {
  return (
    <form className="popup__form popup__form-card">
      <input
        type="text"
        className="popup__input-card-title"
        id="card-title"
        name="name"
        placeholder="Título"
        required
        minLength="2"
        maxLength="30"
      />
      <span id="card-title-error" className="popup__message-input-error"></span>
      <input
        type="url"
        className="popup__input-card-link-img"
        id="link-de-imagem"
        name="link"
        placeholder="Link de imagem"
        required
      />
      <span
        id="link-de-imagem-error"
        className="popup__message-input-error"
      ></span>
      <button type="submit" className="popup__button-new-card">
        Criar
      </button>
    </form>
  );
}
