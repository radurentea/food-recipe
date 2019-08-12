<template>
  <div v-if="meal" class="edit-meal container">
    <h2>Edit {{meal.title}} Meal</h2>

    <form @submit.prevent="EditMeal">
      <div class="field title">
        <label for="title">Meal Title:</label>
        <input type="text" name="title" v-model="meal.title" />
      </div>
      <div v-for="(ing, index) in meal.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredients</label>
        <input type="text" name="ingredient" v-model="meal.ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredients">Add an ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.enter.prevent="addIng" v-model="another" />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Meal</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditMeal",
  data() {
    return {
      meal: null,
      another: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    EditMeal() {
      if (this.meal.title) {
        this.feedback = null;
        // create a slug
        this.meal.slug = slugify(this.meal.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("meals")
          .doc(this.meal.id)
          .update({
            title: this.meal.title,
            ingredients: this.meal.ingredients,
            slug: this.meal.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => console.log(err));
      } else {
        this.feedback = "You must enter a Meal Title";
      }
    },
    addIng() {
      if (this.another) {
        this.meal.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an ingredient";
      }
    },
    deleteIng(ing) {
      this.meal.ingredients = this.meal.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  },
  created() {
    let ref = db
      .collection("meals")
      .where("slug", "==", this.$route.params.meal_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.meal = doc.data();
        this.meal.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-meal {
  margin-top: 60px;
  padding: 20px;
  max-width: 700px;
}
.edit-meal h2 {
  font-size: 3em;
  margin: 20px auto;
}
.edit-meal .field {
  margin: 20px auto;
  position: relative;
}
.edit-meal .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
