import {Itodo} from './../components/App'

export const filterParam = (items:Array<Itodo>, filter: string):Array<Itodo> => {
    if (items) {
        switch (filter) {
            case 'all':
            return items
            case 'todo':
            return items.filter(item => !item.done)
            case 'done':
            return items.filter(item => item.done)
            default:
            return items
        }
    }
}