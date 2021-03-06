const loanApprove = {
	path: "/loan-approve",//贷款审批
	name: "loan-approve",
	meta:{title: "贷款审批",roles:["approve"]},
	component: () => import("@/views/loan-approve/index"),
	children: [
		{
			path: "/loan-approve/first",
			name: "first",
			meta:{title: "初审"},
			component: () => import("@/views/loan-approve/first")
		},
		{
			path: "/loan-approve/end",
			name: "end",
			meta:{title: "终审"},
			component: () => import("@/views/loan-approve/end")
		}
	]
};
export default loanApprove;