import React from 'react'
import { Input } from '../input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { Textarea } from '../textarea';
import { Button } from '../button';

const CommonForm = ({formControls, formData, setFormData, onSubmit, buttonText}) => {
    const renderItem = (item) => {
        let element = null;
        const value = formData[item.name] || "";
        
        switch (item.componentType) {
            case "input":
                element = (
                    <Input 
                        name={item.name} 
                        placeholder={item.placeholder} 
                        id={item.name} 
                        type={item.type} 
                        value={value} 
                        disabled={item.disabled || false} // Add disabled prop
                        onChange={event => setFormData({...formData, [item.name]: event.target.value})}
                    />
                );
                break;
                
            case "email":
                element = (
                    <Input 
                        name={item.name} 
                        placeholder={item.placeholder} 
                        id={item.name} 
                        type={item.type} 
                        value={value}
                        disabled={item.disabled || false} // Add disabled prop
                        onChange={event => setFormData({...formData, [item.name]: event.target.value})} 
                    />
                );
                break;
                
            case "select":
                element = (
                    <Select 
                        onValueChange={(value) => {
                            setFormData({...formData, [item.name]: value})
                        }} 
                        value={value}
                        disabled={item.disabled || false} // Add disabled prop
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={item.placeholder}/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                item.options && item.options.length > 0 ? 
                                item.options.map(optionitem => 
                                    <SelectItem key={optionitem.id} value={optionitem.id}>
                                        {optionitem.label}
                                    </SelectItem>
                                ) : null
                            }
                        </SelectContent>
                    </Select>
                );
                break;
                
            case "textarea":
                element = (
                    <Textarea 
                        name={item.name} 
                        placeholder={item.placeholder} 
                        id={item.name} 
                        type={item.type} 
                        value={value} 
                        disabled={item.disabled || false} // Add disabled prop
                        onChange={event => setFormData({...formData, [item.name]: event.target.value})}
                    />
                );
                break;
                
            default:
                element = (
                    <Input 
                        name={item.name} 
                        placeholder={item.placeholder} 
                        id={item.name} 
                        type={item.type} 
                        value={value}
                        disabled={item.disabled || false} // Add disabled prop
                        onChange={event => setFormData({...formData, [item.name]: event.target.value})} 
                    />
                );
                break;
        }
        return element;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {
                    formControls.map((item) => {
                        // Skip rendering if hidden is true
                        if (item.hidden) {
                            return null;
                        }
                        
                        return (
                            <div className='grid w-full gap-1.5' key={item.name}>
                                <label className='mb-1'>{item.label}</label>
                                {renderItem(item)}
                            </div>
                        );
                    })
                }
            </div>
            <Button className="mt-2 w-full" type="submit">{buttonText || "Submit"}</Button>
        </form>
    )
}

export default CommonForm;