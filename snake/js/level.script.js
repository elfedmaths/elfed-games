function selectLevel(){
    var topic = topicBtn.value
    var topicText
    if(topic){
      switch (topic) {
        case 'prime':
          ansArr = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
          topicText = "Prime Numbers"
          break;
        case 'square':
          ansArr = [1, 4,9, 16, 25, 36, 49, 64, 81]
          topicText = "Square Numbers"
          break;
        case 'triangle':
          ansArr = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91]
          topicText = "Triangle Numbers"
          break;
        default:
          break;
      }
      topicLabel.innerHTML = topicText
      return true;
    }
    return false;
}