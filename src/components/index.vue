<template>
  <div class="index container">
    <div class="card" v-for="meal in meals" :key="meal.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteMeal(meal.id)">delete</i>
        <h2 class="indigo-text">{{ meal.title }}</h2>
        <ul clas="ingredients">
          <li class="ling" v-for="(ing,index) in meal.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditMeal', params: {meal_slug: meal.slug} }">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      meals: []
    };
  },
  methods: {
    deleteMeal(id) {
      // delete doc from firestore
      db.collection("meals")
        .doc(id)
        .delete()
        .then(() => {
          this.meals = this.meals.filter(meal => {
            return meal.id != id;
          });
        });
    }
  },
  created() {
    // fetch data from firestore
    db.collection("meals")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let meal = doc.data();
          meal.id = doc.id;
          this.meals.push(meal);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ling {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}

@media only screen and (min-width: 600px) {
  .index {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
  }
}
@media only screen and (min-width: 900px) {
  .index {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
  }
}
</style>
