## Quick Intro 
As a Web Developer Intern at Thinkmetal, I worked on developing and improving web pages. My role included implementing interactive features and ensuring a smooth user experience. Throughout the internship, I gained hands-on experience in web development and contributed to enhancing the company's online presence.

---
- Setup -  Vite (React)

--- 
## Folder Structure (Component folder)
- Component
 -  BoardTemp.jsx
 - ListTemp.jsx
 - TaskMang.jsx

## Libraries Used
- Tailwind CSS - For Styling 
- react beautiful dnd - For the Drap and Drop feature
- Fontawsome - For the fonts

## Simple explanation about the app
**React code defines a simple task management application composed of three components: BoardTemp, ListTemp, and TaskMang. The TaskMang component serves as the main application, containing the state for managing tasks, an input field for adding new tasks, and tabs to switch between a board view and a list view. Users can input tasks, which are then displayed either on a board with drag-and-drop functionality or in a list format, based on the selected view. Each task has options for deletion, editing, and completion.

The BoardTemp and ListTemp components are responsible for rendering the tasks in a visually appealing way. BoardTemp uses the react-beautiful-dnd library to enable dragging and dropping of tasks between two columns: "To Do" and "Done." Each task displays its title, with options to delete, edit, and mark as complete. The ListTemp component, on the other hand, renders tasks in a simple list format with similar functionalities. The styling is done using Tailwind CSS, providing a clean and responsive user interface. Overall, this code creates a user-friendly task management application that allows for easy organization and manipulation of tasks.**

---
Resources Referred
- [React-beautiful-dnd YouTube tutorial](https://www.youtube.com/watch?v=uEVHJf30bWI&t=1467s)
- [React-beautiful-dnd Repo](https://github.com/atlassian/react-beautiful-dnd#readme)
- [Tailwind CSS Documentation](https://tailwindui.com/documentation)




### Note 

In the development process, I initially considered implementing the task management application using React Router to handle multiple views such as different task lists. However, I found that this approach would add unnecessary complexity to the code. Instead, I opted for a simpler solution, using two distinct components (BoardTemp and ListTemp) within the main TaskMang component. This decision was made to maintain code clarity and ease of understanding, ensuring a straightforward user experience. The application still offers the essential features of task addition, deletion, editing, and completion, and the chosen method provides a clean and efficient way to manage tasks without introducing unnecessary complexity.
