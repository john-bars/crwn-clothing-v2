import CategoryItem from "../category-item/category-item.components"

const Directory = ({categories}) => {
  return (
    <div className = 'directory-container'>
      {categories.map ((cat) => (
       <CategoryItem key = {cat.id} category = {cat} />
      ))}
    </div>
  )
}

export default Directory