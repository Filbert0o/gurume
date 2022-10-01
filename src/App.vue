<script></script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg self-nav">
      <div class="container-fluid self-container">
        <div>
          <h1>
            <span><font-awesome-icon icon="fa-solid fa-user-graduate" /></span> GURUME
          </h1>
        </div>
        <div class="collapse navbar-collapse self-navbar" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link self-link" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link self-link" href="#">Link</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.self-nav {
  margin-left: 20px;
  height: 100px;
}
.self-link {
  color: white;
  margin-left: 50px;
}
.self-link {
}
</style>
