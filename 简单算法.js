
// 斐波那契数列
/* function fibonacci(n) {
  let res = new Array(n + 1).fill(0)
  res[1] = 1
  res[2] = 2
  for (let i = 3; i < n + 1; i++) {
    res[i] = res[i - 1] + res[i - 2]
  }
  return res
}
 */
//  二分法
/*  var res = [1, 4, 7, 8, 12, 34, 67, 88, 99, 100]
 function binarySearch(arr, v, left = 0, right = arr.length - 1) {
   if (left <= right) {
     let mid = parseInt((left + right) / 2)
     if (arr[mid] === v) {
       return mid
     } else if (arr[mid] < v) {
       return binarySearch(arr, v, mid + 1, right)
     } else {
       return binarySearch(arr, v, left, mid - 1)
     }
   }
   return -1
 }
 console.log(binarySearch(res, 8)) */

//  冒泡排序
/* function bubbleSort(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
} */

