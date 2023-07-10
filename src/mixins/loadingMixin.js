export default {
    data(){
        return {
            loading_cnt:0,
        }
    },
    computed:{
        loading(){
            return this.loading_cnt > 0;
        },
    },
    methods: {
        loadingStart(){
            this.loading_cnt ++;
        },

        loadingEnd(){
            if(this.loading_cnt > 0){
                this.loading_cnt --;
            }
        },
    }
}