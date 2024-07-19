// src/mixins/dateMixin.js
import { format, parseISO } from 'date-fns';

export default {
    methods: {
        formatDate(date, dateFormat = 'yyyy-MM-dd') {
            return format(parseISO(date), dateFormat);
        }
    }
};
