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

  <div class="search__container">
    <p class="search__title">Ask me a Question</p>
    <input class="search__input" type="text" placeholder="Search" />
  </div>
</template>

        <style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700,900');

.navbar-nav {
  margin-left: 400px;
}
.header {
  margin-left: 70px;
}
.search__container {
  padding-top: 64px;
}

.search__title {
  font-size: 22px;
  font-weight: 900;
  text-align: center;
  color: #ff8b88;
}

.search__input {
  width: 30%;
  padding: 12px 24px;
  margin-left: 535px;
  background-color: transparent;
  transition: transform 250ms ease-in-out;
  font-size: 14px;
  line-height: 18px;

  color: #ffffff;
  background-color: transparent;
  /*         background-image: url(http://mihaeltomic.com/codepen/input-search/ic_search_black_24px.svg); */

  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTc0LjUzMzMzLDE3LjJjLTMxLjU5NjQyLDAgLTU3LjMzMzMzLDI1LjczNjkyIC01Ny4zMzMzMyw1Ny4zMzMzM2MwLDMxLjU5NjQyIDI1LjczNjkyLDU3LjMzMzMzIDU3LjMzMzMzLDU3LjMzMzMzYzEzLjczOTk4LDAgMjYuMzU4MzQsLTQuODc5MTUgMzYuMjQ3NjYsLTEyLjk3ODM5bDM0LjIzMjAzLDM0LjIzMjAzYzEuNDM4MDIsMS40OTc3OCAzLjU3MzQsMi4xMDExMyA1LjU4MjYsMS41NzczNWMyLjAwOTIsLTAuNTIzNzggMy41NzgyNiwtMi4wOTI4NCA0LjEwMjA0LC00LjEwMjA0YzAuNTIzNzgsLTIuMDA5MiAtMC4wNzk1NywtNC4xNDQ1OCAtMS41NzczNSwtNS41ODI2bC0zNC4yMzIwMywtMzQuMjMyMDNjOC4wOTkyNCwtOS44ODkzMiAxMi45NzgzOSwtMjIuNTA3NjggMTIuOTc4MzksLTM2LjI0NzY2YzAsLTMxLjU5NjQyIC0yNS43MzY5MiwtNTcuMzMzMzMgLTU3LjMzMzMzLC01Ny4zMzMzM3pNNzQuNTMzMzMsMjguNjY2NjdjMjUuMzk5MzcsMCA0NS44NjY2NywyMC40NjczIDQ1Ljg2NjY3LDQ1Ljg2NjY3YzAsMjUuMzk5MzcgLTIwLjQ2NzI5LDQ1Ljg2NjY3IC00NS44NjY2Nyw0NS44NjY2N2MtMjUuMzk5MzcsMCAtNDUuODY2NjcsLTIwLjQ2NzI5IC00NS44NjY2NywtNDUuODY2NjdjMCwtMjUuMzk5MzcgMjAuNDY3MywtNDUuODY2NjcgNDUuODY2NjcsLTQ1Ljg2NjY3eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+');
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: 95% center;
  border-radius: 50px;
  border: 1px solid #ffffff;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.search__input::placeholder {
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.search__input:hover,
.search__input:focus {
  padding: 12px 0;
  outline: 0;
  border: 1px solid transparent;
  border-bottom: 1px solid #ffffff;
  border-radius: 0;
  background-position: 100% center;
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
