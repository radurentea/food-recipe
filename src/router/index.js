import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddMeal from '@/components/AddMeal'
import EditMeal from '@/components/EditMeal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-meal',
      name: 'AddMeal',
      component: AddMeal
    },
    {
      path: '/edit-meal/:meal_slug',
      name: 'EditMeal',
      component: EditMeal
    }
  ]
})
