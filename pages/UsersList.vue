<template>
  <button @click="saveChange">Save Changes</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from "../src/components/users/UserItem.vue";

export default {
  components: {
    UserItem,
  },
  inject: ["users"],

  data() {
    return { changeSaved: false }; //dummy code
  },

  methods: {
    saveChange() {
      this.changeSaved = true;
    }, //this warns we are leaving the page
  },

  beforeRouteEnter(to, from, next) {
    console.log("unserlist cmp beforerouterenter ======>", to, from);
    next();
  },

  // beforeRouteLeave(to, from, next) {
  //   // ...
  // },

  //if user leaves the pages without saving the changes the confirm leave msg will showed up
  beforeRouteLeave(to, from, next) {
    console.log("userlist cmp beforerouteleaves====> ", to, from);

    if (this.changeSaved) {
      next();
    } else {
      const userWantToLeave = confirm("are you sure, didn't saved the changes");
      next(userWantToLeave);
    }
  },

  unmounted() {
    console.log("unmounted");
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
