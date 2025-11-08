<template>
  <!-- Auth Modal -->
  <div class="fixed z-1 inset-0 overflow-y-auto" :class="hiddenClass" id="modal">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="z-99 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="modalVisibility = false">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition " :class="{
                'hover:text-white text-white bg-blue-600': tab == 'login',
                'hover:text-blue-600': tab === 'register'
              }" href="#" @click.prevent="tab = 'login'">Login</a>
            </li>
            <li class="flex-auto text-center">
              <a @click.prevent="tab = 'register'" :class="{
                'hover:text-white text-white bg-blue-600': tab == 'register',
                'hover:text-blue-600': tab === 'login'
              }" class="block rounded py-3 px-4 transition" href="#">Register</a>
            </li>
          </ul>

          <!-- Login Form -->
          <vee-form v-show="tab === 'login'" :validation-schema="loginSchema">
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <vee-field as="input" name="email" rules="required|email" type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 rounded focus:outline-none focus:border-black transition duration-300"
                placeholder="Enter Email" />
              <ErrorMessage name="email" rules="min:8" class="text-red-500 text-sm mt-1" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <vee-field :type="showPassword ? 'text' : 'password'" name="password" rules="required|min:6" as="input"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Password" />
              <i @click="toggleShow" :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']"
                class="absolute top-9 right-3 cursor-pointer text-gray-600"></i>
              <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
              Submit
            </button>
          </vee-form>
          <!-- Registration Form -->
          <form v-show="tab === 'register'">
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <input type="text"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name" />
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <input type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2">Age</label>
              <input type="number"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" />
            </div>
            <!-- Password -->
            <div class="mb-3 relative">
              <label class="inline-block mb-2">Password</label>
              <input :type="showPassword ? 'text' : 'password'"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password" />
              <i @click="toggleShow" :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']"
                class="absolute top-9 right-3 cursor-pointer text-gray-600"></i>
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <input type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password" />
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2">Country</label>
              <select
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <input type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
              <label class="inline-block">Accept terms of service</label>
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapWritableState } from 'pinia'
import { modalStore } from '@/stores/modal';
import validation from '@/includes/validation';
import { getCurrentInstance } from 'vue';

export default {
  name: 'Auth',
  computed: {
    ...mapState(modalStore, ['hiddenClass']),
    ...mapWritableState(modalStore, {
      modalVisibility: 'isOpen'
    }),

    //['isOpen']
    loginSchema() {
      return {
        email: 'required|email',
        password: 'required|min:6|max:15',
      };
    },
    registerSchema() {
      return {
        name: 'required|min:2',
        email: 'required|email',
        age: 'required|min:1|max:120',
        password: 'required|password|min:8',
        confirm_password: 'required|confirmed:@password',
        country: 'required',
        tos: 'required',
      };
    },
  }
  , data() {
    return {
      tab: "login",
      showPassword: false,
      // schema: {
      //   name: 'required',
      //   email: "email|required",
      //   age: "",
      //   password: "",
      //   confirm_passwrod: "",
      //   country: "",
      //   tos: ""
      // }
    }
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>
<style></style>
