export function counter(id) {
    let count = id
    
    function increment() {
         count++
    }

    function getCounter() {
        return count
    }

    return {
        increment,
        getCounter
    }
}

  