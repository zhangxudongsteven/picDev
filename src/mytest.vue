<template>
    <div id="mytest">
        <h2>Basic Test</h2>
        <hr>
        <ul>
            <li v-for="todo in todos">
                {{ todo.text }}
            </li>
        </ul>
        <div v-if="ifshow">
            <h2>Title</h2>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
        </div>
        <h2 v-show="ifshow">Hello!</h2>
        <button v-on:click="changeShow">change show</button>
        <hr>
        <button v-on:click="counter += 1">add</button>
        <p>这个按钮被点击了 {{ counter }} 次</p>
    </div>
</template>

<script>
    export default {
        name: "mytest",
        data() {
                return {
                    todos: [{
                        text: 'Learn JavaScript'
                    }, {
                        text: 'Learn Vue.js'
                    }, {
                        text: 'Build Something Awesome'
                    }],
                    ifshow: true,
                    counter: 0
                }
        },
        methods: {
            changeShow: function(event) {
                this.ifshow = !this.ifshow;
                //alert(event.target.tagName)
            }
        }
    }
</script>
