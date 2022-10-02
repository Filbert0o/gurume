<template>
  <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, name, email } in userFromStore" :key="id">
          <td>{{ name }}</td>
          <td>{{ email }}</td>
          <td>
            <router-link :to="`/edit/${id}`">
              <button class="btn btn-primary btn-sm me-2">Edit</button>
            </router-link>
            <button class="btn btn-danger btn-sm" @click="deleteUser(id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useLoadUsers, deleteUser } from '@/firebase';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const users = useLoadUsers();
    const userFromStore = computed(() => store.getters['getUsers']);

    return { users, userFromStore, deleteUser };
  },
};
</script>
