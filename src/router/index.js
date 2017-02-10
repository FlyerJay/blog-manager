import App from "../App"
export default [
	{
		path:"/",
		component:App,
		children:[
			{
				path:"/cataloglist",
				component:resolve => require(["../pages/cataloglist"],resolve)
			},
			{
				path:"/bloglist",
				component:resolve => require(["../pages/bloglist"],resolve)
			},
			{
				path:"/blogedit/:id",
				component:resolve => require(["../pages/blogedit"],resolve)
			},
			{
				path:"/blogadd",
				component:resolve => require(["../pages/blogadd"],resolve)
			}
		]
	}
] 