function itemHasChildren(item) {
  return item.children && !!item.children.length;
}

function itemIsLeaf(item) {
  return !itemHasChildren(item);
}

function sort(data) {
  return data.sort(function(a,b){
    if (itemHasChildren(a)) return -1;
    return 1;
  });
}

export {
  sort,
  itemIsLeaf,
  itemHasChildren,
}
