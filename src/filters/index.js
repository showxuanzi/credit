export function statusFilter(data){
    switch(data){
        case 0 :
            return "进件";
        case 1 :
            return "提交初审";
        case 2 :
            return "初审通过";
        case 3 :
            return "初审拒绝";
        case 4 :
            return "提交终审";
        case 5 :
            return "终审通过";
        case 6 :
            return "终审拒绝";
        case 7 :
            return "生成合同";
        default :
            return "进件";
    }
}
export function statusType(data){
    switch(data){
        case 0 :
            return "info";
        case 1 :
            return "";
        case 2 :
            return "success";
        case 3 :
            return "danger";
        case 4 :
            return "info";
        case 5 :
            return "success";
        case 6 :
            return "danger";
        case 7 :
            return "success";
        default :
            return "info";
    }
}
export function sexFilter(data){
    switch (data) {
        case 'man':
            return '男';
        case 'woman':
            return '女';
        default:
            return "男";
    }
}
export function educationFilter(data){
    switch (data) {
        case 'college':
            return '大学';
        case 'highschool':
            return '高中';
        default:
            return "大学";
    }
}
export function marriageFilter(data){
    switch (data) {
        case 'married ':
            return '已婚';
        case 'unmarried':
            return '未婚';
        default:
            return "未婚";
    }
}

// 初审通过、未通过
export function firstRusltFilter(data){
    switch (data) {
        case 'pass':
            return '已通过';
        case 'reject':
            return '未通过';
        default:
            return "待操作";
    }
}

// 初审状态标签
export function firstStatusFilter(data){
    switch (data) {
        case 'pass':
            return 'success';
        case 'reject':
            return 'danger';
        default:
            return "info";
    }
}
