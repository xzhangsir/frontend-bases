
/*  var list = [
   {
     id: "ab",
     children: [
       {
         id: "cd",
         children: [
           {
             id: "ef",
             children: []
           }
         ]
       },
       {
         id: "fg",
         children: []
       }
     ]
   }
 ]
 function findPathByLeafId(leafId, nodes, path = []) {
   for (var i = 0; i < nodes.length; i++) {
     path.push(nodes[i].id);
     if (leafId == nodes[i].id) return path;
     if (nodes[i].children) {
       var findResult = findPathByLeafId(leafId, nodes[i].children, path);
       if (findResult) return findResult;
     }
   }
 }
 console.log(findPathByLeafId('ef', list)) */

/*   setTimeout(function () {
    console.log('start')
  })
  new Promise(function (res) {
    console.log('for')
    for (var i = 0; i < 1000; i++) {
      i == 99 && res()
    }
  }).then(function () {
    console.log('执行then')
  })
  console.log('end') */


/* let a = {
    n:1
}

let  b = a

a.x = a = {
    n:2
}

console.log(a.x)
console.log(b)      */

/* for (var i = 0; i < 10; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i)
    })
  })(i)
} */