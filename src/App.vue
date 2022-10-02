<script></script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg self-nav">
      <div class="container-fluid self-container">
        <div>
          <h1 class="header" style="color: white">
            <span><font-awesome-icon icon="fa-solid fa-user-graduate" /></span> Gurume
          </h1>
        </div>
        <div class="collapse navbar-collapse self-navbar" id="navbarSupportedContent">
          <div class="searchBar">
            <input
              id="searchQueryInput"
              type="text"
              name="searchQueryInput"
              placeholder="Search"
              value=""
            />
            <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
              <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                <path
                  fill="#666666"
                  d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                />
              </svg>
            </button>
          </div>
          <ul class="col-8 navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link self-link" aria-current="page" href="#">Courses</a>
            </li>
            <li class="nav-item">
              <a class="nav-link self-link" href="#">Achievements</a>
            </li>
            <li class="nav-item">
              <a class="nav-link self-link" aria-current="page" href="#">Career</a>
            </li>
            <li class="nav-item">
              <a class="nav-link self-link" href="#">About Us</a>
            </li>
            <li class="login">
              <a class="btn nav-link self-link" href="#">LOG IN</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.navbar-nav {
  margin-left: 10px;
}
.header {
  margin-left: 70px;
}
.searchBar {
  width: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
#searchQueryInput {
  margin-left: 50px;
  width: 100%;
  height: 2.8rem;
  background: #f5f5f5;
  outline: none;
  border: none;
  border-radius: 1.625rem;
  padding: 0 3.5rem 0 1.5rem;
  font-size: 1rem;
}

#searchQuerySubmit {
  width: 3.5rem;
  height: 2.8rem;
  margin-left: -3.5rem;
  background: none;
  border: none;
  outline: none;
}

#searchQuerySubmit:hover {
  cursor: pointer;
}
.self-nav {
  margin-left: 20px;
  height: 100px;
  font-size: 18px;
}
.self-link {
  color: white;
  margin: 0px;
}
.nav-item {
  margin: 30px;
}
.login {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 100px;
  margin-top: 30px;
  margin-bottom: 40px;
  background: none;
  color: green;
  text-decoration-color: white;
  border: 2px solid;
  padding: 2px 2px;
  font-size: 1em;
  border-radius: 0.5rem;
}
button:hover {
  border-color: #f1ff5c;
  color: white;
  background-color: green;
  box-shadow: 0 0.5em 0.5em -0.4em #f1ff5c;
  transform: translateY(-0.25em);
  cursor: pointer;
}
</style>
