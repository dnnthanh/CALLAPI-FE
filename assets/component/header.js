class MyHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="container-fluid">
            <div class="container">
                    <div class="row">
                        <a href="index.html">
                            <div class="col-12 col-md-3 fh5co_padding_menu">
                                <img src="images/logo.png" alt="img" class="fh5co_logo_width" />
                            </div>
                        </a>

                        <div class="col-12 col-md-9 align-self-center fh5co_mediya_right">
                            <form class="d-flex" role="search">
                            <input
                                class="form-control me-2 value-search"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button class="btn btn-outline-success search-keyword" type="submit">
                                Search
                            </button>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
      `;
  }
}

customElements.define("my-header", MyHeader);
