import App from "../App"
export default [
	{
		path:"/",
		component:App,
		children:[
			{
				path:"manager",
				component:App
			},
			{
				path:"manager/cataloglist",
				component:resolve => require(["../pages/cataloglist"],resolve)
			},
			{
				path:"manager/bloglist",
				component:resolve => require(["../pages/bloglist"],resolve)
			},
			{
				path:"manager/blogedit/:id",
				component:resolve => require(["../pages/blogedit"],resolve)
			},
			{
				path:"manager/blogadd",
				component:resolve => require(["../pages/blogadd"],resolve)
			}
		]
	}
] 