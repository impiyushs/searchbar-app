import React, { Component } from 'react';
import _ from 'lodash';

class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            filter: [],
            seller: '',
            item: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.filter = this.filter.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.products.length){
            this.setState({
                filter: nextProps.products
            });
        }
    }
    filter(){
        let filter = [];
        if(this.state.seller !== '' && this.state.item !== ''){
            filter = _.filter(this.props.products, {'seller': this.state.seller, 'item': this.state.item});
        }else if(this.state.seller !== ''){
            filter = _.filter(this.props.products, {'seller': this.state.seller});
        }else if(this.state.item !== ''){
            filter = _.filter(this.props.products, {'item': this.state.item});
        }else{
            filter = this.props.products;
        }
        this.setState({filter});
    }
    handleChange(event){
        if(event.target.id === 'selSeller'){
            this.setState({seller: event.target.value}, ()=>{
                this.filter();
            });
        }else if(event.target.id === 'selItem'){
            this.setState({item: event.target.value}, ()=>{
                this.filter();
            });
        }
    }
    renderFilters(){
        if(this.props.products.length == 0) return;
        const suppliers = _.uniqBy(this.props.products, 'seller');
        const products = _.uniqBy(this.props.products, 'item');
        const productsHtml = products.map((item, index) => {
            return <option key={index}>{item.item}</option>
        });
        const suppliersHtml = suppliers.map((item, index) => {
            return <option key={index}>{item.seller}</option>
        });
        return(
            <form>
                <div className="row">
                    <div className="form-group col-md-4">
                        <label htmlFor="selSeller">Seller</label>
                        <select className="form-control" id="selSeller" onChange={this.handleChange}>
                            <option></option>
                            {suppliersHtml}
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="selItem">Product</label>
                        <select className="form-control" id="selItem" onChange={this.handleChange}>
                            <option></option>
                            {productsHtml}
                        </select>
                    </div>
                </div>
            </form>
        );
    }
    renderProducts(){
        const productsHtml = this.state.filter.map((item, index) => {
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.seller}</td>
                    <td>{item.item}</td>
                    <td>{item.description}</td>
                    <td>${item.price}</td>

                </tr>
            );
        });
        return(
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Seller</th>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsHtml}
                    </tbody>
                </table>
            </div>
        );
    }
    render(){
        return(
            <div className="col-sm-12 col-md-12 main">
                <h1 className="page-header">Products</h1>
                {this.renderFilters()}
                <h2 className="sub-header">Product details</h2>
                {this.renderProducts()}
            </div>
        );
    }
}

export default Products;
