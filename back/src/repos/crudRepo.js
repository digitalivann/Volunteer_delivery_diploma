class CrudRepository {
    constructor(context) {
        this.context = context;
    }

    createInstance(data) {
        return this.context.create({data: data});
    }

    getInstanceById(id) {
        return this.context.findUnique({where: {id}});
    }

    updateInstanceById(data, id) {
        return this.context.update({where: {id}, data: data});
    }

    deleteInstanceById(id) {
        return this.context.delete({where: {id}});
    }

    getAllInstances() {
        return this.context.findMany();
    }

}
export default CrudRepository;
