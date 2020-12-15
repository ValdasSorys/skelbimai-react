import React from 'react';
import { Pagination } from 'react-bootstrap';
export class PagingElement extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { matches: window.matchMedia("(min-width: 992px)").matches };
    }
    componentDidMount() {
        const handler = e => this.setState({matches: e.matches});
        window.matchMedia("(min-width: 992px)").addListener(handler);        
    }
    
    generatePagination(pageCount){
        var items = [];
        var keynum = 1;
        items.push(<Pagination.Prev key ={keynum++} style={{"width": "40px"}} onClick={() => this.props.whenClicked(this.props.page - 1, this.props.moveToTop)}/>);
        items.push(<Pagination.Item key ={keynum++} style={{"width": "40px"}} active = {this.props.page === 1 ? true : false} onClick={() => this.props.whenClicked(1, this.props.moveToTop)}>{1}</Pagination.Item>);
        
        var i;
        var iMax;
        
        if (this.state.matches)
        {
            i = this.props.page-3;
            if (i < 2)
            {
                i = 2;
            }
            if (i > pageCount - 7)
            {
                i = pageCount-7;
            }
            iMax = i+7;
        }
        else
        {
            i = this.props.page-2;
            if (i < 2)
            {
                i = 2;
            }
            if (i > pageCount - 5)
            {
                i = pageCount-5;
            }
            iMax = i+5;
        }
        if (i > 2)
        {
            items.push(<Pagination.Ellipsis key ={keynum++} style={{"width": "40px"}}/>);
            i = i + 1;
        }
        var addElipsis = false;;
        if (iMax < pageCount)
        {
            addElipsis = true;
            iMax = iMax - 1;
        }
        for (; i < iMax; i++) {
            let pageNum = i;
            if (pageNum > 1 && pageNum < pageCount)
            {
                items.push(<Pagination.Item key ={keynum++} style={{"width": "40px"}} active = {this.props.page === pageNum ? true : false} onClick={() => this.props.whenClicked(pageNum, this.props.moveToTop)}>{pageNum}</Pagination.Item>);
            }
        }
        if (addElipsis)
        {
            items.push(<Pagination.Ellipsis key ={keynum++} style={{"width": "40px"}}/>);
        }
        if (pageCount !== 1)
        {
            items.push(<Pagination.Item key ={keynum++} style={{"width": "40px"}} active = {this.props.page === pageCount ? true : false} onClick={() => this.props.whenClicked(pageCount, this.props.moveToTop)}>{pageCount}</Pagination.Item>);
        }            
        items.push(<Pagination.Next key ={keynum++} style={{"width": "40px"}} onClick={() => this.props.whenClicked(this.props.page + 1, this.props.moveToTop)}/>);
        return items;
    }
    render()
  { 
    let pagingElements = this.generatePagination(this.props.pageCount);  
    return (
        <div style={{"margin": "0 auto", "display": "table", "height": "38px", "textOverflow": "ellipsis"}}>
        <Pagination style={{"height":"0px"}}>
        {pagingElements}
        </Pagination>
        </div> 
    );
  }
}